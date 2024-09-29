const {ccclass, property} = cc._decorator;

@ccclass
export default class block_move extends cc.Component
{
    private anim: cc.Animation = null;
    private clips: cc.AnimationClip[] = null;

    start() {
        this.anim = this.getComponent(cc.Animation);
        //this.clips = this.anim.getClips();
        console.log(this.anim.getClips()[0].name)
    }

    update(dt) {
        //let clips : cc.AnimationClip[] = this.anim.getClips();
        if(!this.anim.getAnimationState(this.anim.getClips()[0].name).isPlaying){
            this.anim.play(this.anim.getClips()[0].name);
        }
    }
}