import { Request, Response } from 'express';
import IndexService from '../services/index.service'
import { MyResponse } from '../interfaces/my_response.interface'

class IndexController {
    private indexService: IndexService;
    constructor() {
        this.indexService = new IndexService();
    }

    public getIndexPage = async (req: Request, res: Response): Promise<void> => {
        const response: MyResponse<string> = await this.indexService.getIndexPage();
        if (response.error) {
            res.status(500).json(response.error);
            return;
        }
        res.status(200).send(response.result);
    }
}

export default IndexController;