class Component{
    constructor(props){
        this.props = props;
    }
    createDOMFromString(domString){
        const div = document.createElement('div');
        div.innerHTML = domString;
        return div.children[0];
    }
    setState(state){
        this.state = state;
        let oldEle = this.ele;
        let parent = oldEle.parentElement;
        this.getElement();
        parent.replaceChild(this.ele,oldEle);
    }
    getElement(){
        this.ele = this.createDOMFromString(this.render());
        this.ele.addEventListener('click',this.handleClick.bind(this));
    }
    $mount(container){
        this.getElement();
        container.appendChild(this.ele);
    }
}
class LikeButton extends Component{
    constructor(props){
        super(props);
        this.state = {isLiked:false};
    }

    handleClick(){
        this.setState({
            isLiked:!this.state.isLiked
        })
    }
    render(){
        return (
            `
             <button class="like-btn">
                <span class="like-text">为${this.props.name} ${this.state.isLiked?'取消':'点赞'}</span>
             </button>
            `
        )
    }
}