import react from 'react';
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

import firebase from "firebase/app";
import firestore from "firebase";




class App extends react.Component {

  constructor() {
    super();
    this.state = {
      products: [
        // {
        //   qty: 1,
        //   price: 8999,
        //   title: 'Mobile Phone',
        //   img:'https://media.wired.com/photos/610050dc8eb98ab033ce45df/master/w_2400,h_1800,c_limit/Gear-Nokia-G20.jpg',
        //   id:1
        // },
        // {
        //   qty: 1,
        //   price: 999,
        //   title: 'Watch',
        //   img:'https://staticimg.titan.co.in/Fastrack/Catalog/3072SL06_2.jpg?pView=pdp',
        //   id:2
        // },
        // {
        //   qty: 1,
        //   price: 1499,
        //   title: 'Bluetooth Speaker',
        //   img:'https://www.bhphotovideo.com/images/images2500x2500/jbl_jblgo3bluam_go_3_portable_bluetooth_1583007.jpg',
        //   id:3
        // }
      ],
      loading : true
    }
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
      // .then((snapshot) => {
      //   console.log(snapshot)


      //   snapshot.docs.map((doc) => {
      //     console.log(doc.data ());
      //   });

      //   const products = snapshot.docs.map((doc) => {
      //     const data = doc.data();

      //     data['id'] = doc.id;
      //     return data;
      //   });

      //   this.setState({
      //     products : products,
      //     loading : false
      //   })

      // })


    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        console.log(snapshot)


        snapshot.docs.map((doc) => {
          console.log(doc.data ());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        });

        this.setState({
          products : products,
          loading : false
        })

  
      })
      

  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products
    });
  }
  handleDncreaseQuantity = (product) => {
    console.log('Hey please inc the qty of', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
      
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id); //[{}]

    this.setState({
      products: items
    })

  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price
      }
      return '';
    });

    return cartTotal;
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDncreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }

}

export default App;
