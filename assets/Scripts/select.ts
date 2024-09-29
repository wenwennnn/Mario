const {ccclass, property} = cc._decorator;

@ccclass
export default class select extends cc.Component {

    @property(cc.Node)
    name_lable: cc.Node = null;

    @property(cc.Node)
    score_lable: cc.Node = null;

    @property(cc.Node)
    life_lable: cc.Node = null;

    @property(cc.Slider)
    volumn: cc.Slider = null;

    start () {



        console.log(firebase.auth().currentUser);

        this.name_lable.getComponent(cc.Label).string = firebase.auth().currentUser.displayName;

        firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/Best_score').once('value',(snapshot)=>{
            this.score_lable.getComponent(cc.Label).string = snapshot.val();
        })

        firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/life').once('value',(snapshot)=>{
            this.life_lable.getComponent(cc.Label).string = snapshot.val();
        })

        //this.score_lable.getComponent(cc.Label).string = data;

        this.volumn.progress = 0.5;

        let onebtn = new cc.Component.EventHandler();
        onebtn.target = this.node;
        onebtn.component = "select";
        onebtn.handler = "loadlevel1";

        cc.find("level1").getComponent(cc.Button).clickEvents.push(onebtn);

        let twobtn = new cc.Component.EventHandler();
        twobtn.target = this.node;
        twobtn.component = "select";
        twobtn.handler = "loadlevel2";

        cc.find("level2").getComponent(cc.Button).clickEvents.push(twobtn);

        let leaderbtn = new cc.Component.EventHandler();
        leaderbtn.target = this.node;
        leaderbtn.component = "select";
        leaderbtn.handler = "loadleaderboard";

        cc.find("Canvas/leaderboard").getComponent(cc.Button).clickEvents.push(leaderbtn);
    }

    loadleaderboard(){
        console.log('here');
        cc.director.loadScene("leaderboard")
    }

    loadlevel1(){
        //console.log('hehe')
        cc.director.loadScene("gamestart");
    }

    loadlevel2(){
        firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/stage').once('value',(snapshot)=>{
            if(snapshot.val() == 1){
                alert('請先完成第一關')
            }
            else{
                cc.director.loadScene("gamestart2");
            }
        })
    }

    update(dt) {
        cc.audioEngine.setMusicVolume(this.volumn.progress)
    }
}