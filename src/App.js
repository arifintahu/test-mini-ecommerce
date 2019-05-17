import React,{ Component } from 'react';
import './App.css';
import './Popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barang from './component/barang.js';

const item = [
  {
    id: 1,
    name: 'Keyboard Logitek',
    price: 60000,
    description: 'Keyboard untuk sehari-hari',
    img: '/assets/keyboard1.jpg'
  },
  {
    id: 2,
    name: 'Keyboard MSI',
    price: 300000,
    description: 'Keyboard untuk gaya',
    img: '/assets/keyboard2.jpg'
  },
  {
    id: 3,
    name: 'Mouse Jenius',
    price: 50000,
    description: 'Mouse untuk gaya',
    img: '/assets/mouse1.jpg'
  },
  {
    id: 4,
    name: 'Mouse Jerry',
    price: 30000,
    description: 'Mouse untuk sehari-hari',
    img: '/assets/mouse2.jpg'
  }
];
localStorage.setItem('items',JSON.stringify(item));

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialItems : JSON.parse(localStorage.getItem('items')),
      items:[],
      cart:[],
      totalCart: 0,
      cari : '',
      showPopup: false
    }
    this.checkOut = this.checkOut.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCart = this.onCart.bind(this);
  }

  componentWillMount(){
    const items = this.getItems();
    this.setState({ items:items });
  }

  getItems(){
    return this.state.initialItems;
  }

  onSubmit(event){
    event.preventDefault();
    this.setState({cari:this.inputName.value});
  }

  onChange(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  onCart(cartItem){
    var i =0;
    let total = cartItem.map((item)=>{
      i = i + item.item.price;
      return i;
    });
    Promise.all(total).then((completed)=>{
      this.setState({ totalCart:i })
    });
    this.setState({ cart:cartItem });
  }

  checkOut(e) {
    e.preventDefault();
    const pop = this.state.showPopup;
    this.setState({ showPopup: !pop });
  }

  render(){
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center App-header">
            <a className="navbar-brad my-2 my-lg-0 text-left" href="/">Mini E-commerce</a>
            <form className="form-inline mx-lg-5 my-2 my-lg-0" onSubmit={this.onSubmit}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.onChange} ref={inputName => this.inputName = inputName} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <button className="btn btn-primary" onClick={this.checkOut}>Cart {this.state.cart.length}</button>
          </nav>
          <br />
          <div className="barang">
            <Barang item={this.state.items} onCart={this.onCart}/>
            {this.state.showPopup ? 
                <Popup
                text='Summary'
                closePopup={this.checkOut}
                cart={this.state.cart}
                totalCart={this.state.totalCart}
                />
                : null
              }
          </div>
        </div>
      </div>
    );
  }
}

class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <ul>
            {
              this.props.cart.map((item) =>{
                return(
                  <li>{item.item.name} - Rp{item.item.price},00</li>
                );
              })
            }
          </ul>
          <p>Total harga Rp{this.props.totalCart},00</p>
        <a href="/" className="btn btn-success m-2" onClick={this.props.closePopup}>Buy</a>
        <button className="btn btn-primary" onClick={this.props.closePopup}>Add Another Item</button>
        </div>
      </div>
    );
  }
}

export default App;
