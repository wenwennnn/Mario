import { GameManager } from "./menuGameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class victory extends cc.Component {

    @property(GameManager)
    GameMgr: GameManager = null;

    start() {
        this.scheduleOnce(() => {
            cc.director.loadScene("select");
        }, 5);
    }
}