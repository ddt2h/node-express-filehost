import { query, Request, Response } from 'express';
import FileService from '../services/file.service'
import { MyResponse } from '../interfaces/my_response.interface'
import { FileInfo } from '../interfaces/fileinfo.interface'

class FileController {
    private fileService: FileService;
    constructor() {
        this.fileService = new FileService();
    }

    public getList = async (req: Request, res: Response): Promise<void> => {
        try {
            const response: MyResponse<FileInfo[]> = await this.fileService.getList();
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json({result: null, error: err as Error});
        }
    }

    public getFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const fileName: string = req.params.name as string;
            this.fileService.getFile(fileName, res);
        }
        catch (err) {
            res.status(500).json({result: null, error: err as Error});
        }
    }

    public postFile = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.fileService.processFileUpload(req, res);
            res.status(200).json({result: 'File uploaded', error: null});
        } catch (err) {
            res.status(500).json({result: null, error: err as Error});
        }
    }

    public deleteFile = async(req: Request, res: Response): Promise<void> => {
        try {
            const fileName: string = req.params.name as string;
            await this.fileService.deleteFile(fileName);
            res.status(200).json({result: `File ${fileName} deleted`, error: null});
        }
        catch(err) {
            res.status(500).json({result: null, error: err as Error});
        }
        
    }
}

export default FileController;