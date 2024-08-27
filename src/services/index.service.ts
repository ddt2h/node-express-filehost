import { promises as fs } from 'fs';
import * as path from 'path';
import {MyResponse} from '../interfaces/my_response.interface'

class IndexService {
    private indexPath: string;

    constructor() {
        this.indexPath = path.join(__dirname, '../view/index.html');
      }

    public async getIndexPage() : Promise<MyResponse<string>> {
        try {
            let file: string = await fs.readFile(this.indexPath, 'utf-8');
            return {result: file, error : null};
        }
        catch(error: any) {
            return {result: null, error : error.message ?? 'Pizda polnaya'};
        }
        
    }
}

export default IndexService;