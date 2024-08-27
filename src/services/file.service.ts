import { createWriteStream, createReadStream, exists, existsSync, promises as fs, rmSync, StatsFs } from 'fs';
import { IncomingMessage, OutgoingMessage } from 'http';
import * as path from 'path';
import multer from 'multer';
import { MyResponse } from '../interfaces/my_response.interface'
import { FileInfo } from '../interfaces/fileinfo.interface'

class FileService {
    private filePath: string;
    private upload: multer.Multer;

    constructor() {
        this.filePath = path.join(__dirname, '../../data');
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'data/')
            },
            filename: async (req, file, cb) => {
                let str: string = Buffer.from(file.originalname, 'latin1').toString('utf-8');
                file.originalname = str;
                cb(null, file.originalname);
            },
        });

        this.upload = multer({ storage: storage });
    }

    public async getList(): Promise<MyResponse<FileInfo[]>> {
        try {
            const fileList: string[] = await fs.readdir(this.filePath);
            let fileInfos: FileInfo[] = [];
            for (let i = 0; i < fileList.length; i++) {
                let fileStat = await fs.stat(path.join(this.filePath, fileList[i]));
                let info: FileInfo = {name: fileList[i], size: fileStat.size, createdAt: fileStat.birthtimeMs};
                fileInfos.push(info);         
            }
            return { result: fileInfos, error: null };
        }
        catch (err) {
            return { result: null, error: err as Error };
        }
    }

    public async getFile(filename: string, res: OutgoingMessage): Promise<void> {
        const fullFilePath = path.join(this.filePath, filename);

        // Check if the file exists before trying to read it
        if (!existsSync(fullFilePath)) {
            res.end('File not found');
            return;
        }

        // Set appropriate headers
        res.setHeader('Content-Type', 'application/octet-stream');
        //res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Create a readable stream and pipe it to the response
        const fileStream = createReadStream(fullFilePath);

        // Handle errors with the stream
        fileStream.on('error', (err) => {
            if (!res.headersSent) {
                res.end('Error reading file');
            }
        });

        // Pipe the file stream to the response
        fileStream.pipe(res).on('finish', () => {
            // Ensure we end the response correctly when the stream finishes
            if (!res.headersSent) {
                res.end();
            }
        });
    }


    public async processFileUpload(req: any, res: any): Promise<void> { //fix any
        return new Promise<void>((resolve, reject) => {
            try {
                this.upload.single('file')(req, res, next => {
                    resolve();
                });
            }
            catch (err) {
                reject(err as Error);
            }
        })
    }

    public async deleteFile(filename: string): Promise<void> {
        if (!existsSync(path.join(this.filePath, filename))) {
            throw ('File not found');
        }
        rmSync(path.join(this.filePath, filename), { recursive: true, force: true });
    }

}

export default FileService;