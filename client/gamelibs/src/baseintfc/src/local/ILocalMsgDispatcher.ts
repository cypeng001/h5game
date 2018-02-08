namespace h5game
{

export type ILocalMsgCallback = (msg: any) => void;

export interface ILocalMsgDispatcher {

    addMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;

    removeMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;

    hasMsgListener(id: ILocalMsg, callback: ILocalMsgCallback): boolean;

    clearMsgListener(id: ILocalMsg): void;

    dispatchMsg(id: ILocalMsg, msg: any): void;
}

}