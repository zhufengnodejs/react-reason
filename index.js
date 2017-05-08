const createDOMFromString = function(domString){
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div.children[0];
}

class LikeButton{
    constructor(){
        this.state = {isLiked:false};
    }
    setState(state){
        this.state = state;
        let oldEle = this.ele;
        let parent = oldEle.parentElement;
        this.render();
        parent.replaceChild(this.ele,oldEle);
    }
    handleClick(){
        this.setState({
            isLiked:!this.state.isLiked
        })
    }
    render(){
        this.ele = createDOMFromString(`
             <button class="like-btn">
                <span class="like-text">${this.state.isLiked?'点赞':'取消'}</span>
             </button>
            `);
        this.ele.addEventListener('click',this.handleClick.bind(this));
        return this.ele;
    }
}