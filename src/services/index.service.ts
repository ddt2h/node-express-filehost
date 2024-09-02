import { promises as fs } from 'fs';
import * as path from 'path';
import { MyResponse } from '../interfaces/my_response.interface'
import { ChildProcess, exec } from 'child_process';

class IndexService {
    private indexPath: string;

    constructor() {
        this.indexPath = path.join(__dirname, '../view/index.html');
    }

    public async getHamachiIP(): Promise<string> {
        return new Promise<string>((res, rej) => {
            exec('ip addr show ham0', (error, stdout, stderr) => {
                if (error) {
                    rej(`Error executing command: ${error.message}`);
                }

                if (stderr) {
                    rej(`Error in command output: ${stderr}`);
                }
                const ipRegex = /inet\s(\d+\.\d+\.\d+\.\d+)/;
                const match = stdout.match(ipRegex);
                if (match) {
                    const ipAddress = match[1];
                    res(ipAddress);
                } else {
                    rej('IP address not found');
                }
            });
        });
    }

    public async getIndexPage(): Promise<MyResponse<string>> {
        try {
            let file: string = await fs.readFile(this.indexPath, 'utf-8');
            return { result: file, error: null };
        }
        catch (error: any) {
            return { result: null, error: error as Error };
        }

    }
}

export default IndexService;