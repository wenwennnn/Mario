import { GameManager } from "./menuGameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gamestart extends cc.Component {

    @property(GameManager)
    GameMgr: GameManager = null;

    start() {
        this.scheduleOnce(() => {
            cc.director.loadScene("game");
        }, 3);
    }
}