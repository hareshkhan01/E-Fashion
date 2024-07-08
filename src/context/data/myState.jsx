import React, { useEffect, useState } from 'react'
import MyContext from '../../context/data/myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const addProduct = async () => {
    if (Object.values(products).includes(null)) {
      return toast.error('Please fill all fields');
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      getProductData();
      setLoading(false);
      window.location.href = '/dashboard';
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  }

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const edithandle = (item) => {
    setProducts(item);
  }

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product updated successfully");
      getProductData();
      setLoading(false);
      window.location.href = '/dashboard';
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  }

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product deleted successfully');
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [user, setUser] = useState([]);

  const getUsersData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [wishLists, setWishLists] = useState([]);

  const getUserData = async () => {
    const user_from_local = JSON.parse(localStorage.getItem('user_login'));
    const userId = user_from_local.user.uid;
    try {
      const result = await getDocs(collection(fireDB, "users"));
      result.forEach((doc) => {
        const data = doc.data();
        if (data.uid === userId) {
          setCurrentUser({ ...data, id: doc.id });
          setWishLists(data.wishList || []); // Ensure wishList is always an array
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log("WishList Updated:", wishLists);
  }, [wishLists]);
  const isProductInWishList = (product) => {
    return wishLists.some(item => item.id === product.id);
  };
  const updateWishList = async () => {
    try {
      await setDoc(doc(fireDB, "users", currentUser.id), currentUser);
      await getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const removeProductFromWishList = async (product) => {
    const updatedWishList = currentUser.wishList.filter(item => item.id !== product.id);
    currentUser.wishList = updatedWishList;
    try {
      await setDoc(doc(fireDB, "users", currentUser.id), currentUser);
      setWishLists(updatedWishList);
      toast.success('Product removed from wishlist');
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove product from wishlist');
    }
  };
  (null)
  const buyProducts = async (products) => {
    try {
      const updatePromises = products.map(async (product) => {
        if (product !== null) {
          console.log(product);
          let num = parseInt(product.number_of_product, 10);
          console.log("Number = " + (num - 1));
          const updatedProduct = { ...product, number_of_product: (num - 1).toString() };
          console.log(updatedProduct);
          await setDoc(doc(fireDB, "products", product.id), updatedProduct);
          getProductData();
        }
      });

      await Promise.all(updatePromises);
      window.location.href = '/';
    } catch (error) {
      console.error("Error updating products: ", error);
    }
  };

  const updateOrder=async (order)=>{
    setLoading(true);
    try{
      await setDoc(doc(fireDB,"orders",order.id),order);
      
    }
    catch(error)
    {

    }
  }

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product,
      updateProduct, edithandle, deleteProduct, order, user,
      searchkey, setSearchkey, filterType, setFilterType,
      filterPrice, setFilterPrice, getUsersData, getProductData, getOrderData, getUserData, currentUser, updateWishList, wishLists, isProductInWishList, removeProductFromWishList, buyProducts
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState;
