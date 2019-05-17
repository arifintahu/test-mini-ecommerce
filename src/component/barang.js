import React,{ Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Barang extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item,e){
        e.preventDefault();
        const cart = this.state.cart;
        cart.push({item});
        this.setState({ cart });
        this.props.onCart(cart);
    }

  render(){
    return (
      <div className="card-deck">
        {
            this.props.item.map((item)=>{
                return(
                    <div className="card mb-4" key={item.name}>
                        <img className="card-img-top p-2" height="200" width="200" src={item.img}/>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text"><small className="text-muted">{item.price}</small></p>
                            <a href="#" className="btn btn-primary" onClick={(e)=>this.handleClick(item,e)}> Add to Chart</a>
                        </div>
                    </div>
                );
            })
        }
      </div>
    );
  }
}


export default Barang;
