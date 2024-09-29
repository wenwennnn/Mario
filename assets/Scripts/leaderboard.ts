const {ccclass, property} = cc._decorator;

@ccclass
export default class select extends cc.Component {

    @property(cc.Node)
    one: cc.Node = null;

    @property(cc.Node)
    two: cc.Node = null;

    @property(cc.Node)
    three: cc.Node = null;

    @property(cc.Node)
    four: cc.Node = null;

    @property(cc.Node)
    five: cc.Node = null;

    start() {

        let exitbtn = new cc.Component.EventHandler();
        exitbtn.target = this.node;
        exitbtn.component = "leaderboard";
        exitbtn.handler = "loadGameScene";

        cc.find("ExitButton").getComponent(cc.Button).clickEvents.push(exitbtn);

        firebase.database().ref('Users').orderByChild('Best_score').limitToLast(5).once('value', (snapshot) => {
            let scores = [];
            snapshot.forEach((item) => {
                scores.push({
                    name: item.child('name').val(),
                    score: item.child('Best_score').val()
                });
            });
        
            scores.sort((a, b) => b.score - a.score);
        
            for (let i = 0; i < scores.length; i++) {
                // const label = this.getLabelComponentByIndex(i);
                // label.string = `${scores[i].name} - ${scores[i].score}`;
                if(i == 4){
                    this.five.getComponent(cc.Label).string = `${scores[i].name} - ${scores[i].score}`;
                }
                if(i == 3){
                    this.four.getComponent(cc.Label).string = `${scores[i].name} - ${scores[i].score}`;
                }
                if(i == 2){
                    this.three.getComponent(cc.Label).string = `${scores[i].name} - ${scores[i].score}`;
                }
                if(i == 1){
                    this.two.getComponent(cc.Label).string = `${scores[i].name} - ${scores[i].score}`;
                }
                if(i == 0){
                    this.one.getComponent(cc.Label).string = `${scores[i].name} - ${scores[i].score}`;
                }
            }
        });
    }

    loadGameScene(){
        cc.director.loadScene("select");
    }

    
}