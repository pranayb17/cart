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
      products: [],
      loading: true
    }
    this.db = firebase.firestore();
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


    this.db
      .collection('products')
      // .where('price', '==', 999)
      // .where('title', '==', 'Bluetooth Speaker')
      .orderBy('price', 'desc')
      .onSnapshot((snapshot) => {
        console.log(snapshot)


        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        });

        this.setState({
          products: products,
          loading: false
        })


      })


  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('updated successfully')
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }
  handleDncreaseQuantity = (product) => {
    console.log('Hey please inc the qty of', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('updated successfully')
      })
      .catch((error) => {
        console.log('Error', error);
      })


  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id); //[{}]

    // this.setState({
    //   products: items
    // });

    const docRef = this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(() => {
        console.log('Deleted successfully')
      })
      .catch((error) => {
        console.log('Error', error);
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

  addProduct = () => {

    this.db
      .collection('products')
      .add({
        img: '',
        price: 55999,
        qty: 1,
        title: 'Camera'
      })
      .then((docRef) => {
        console.log('product has been added', docRef)
      })
      .catch((error) => {
        console.log('Error :', error);
      })

  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20}}>Add a product</button> */}
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
