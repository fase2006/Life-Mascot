import React, { useState } from 'react';
import BackButton from './BackButton';
import products from '../mock/products';

const ShopScreen = ({ onBack, currentUser }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('delivery'); // 'delivery' or 'pickup'
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState({ department: '', province: '', district: '', street: '', number: '', apt: '' });
  const [orderTracking, setOrderTracking] = useState([]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = currentUser.isPremium ? 0 : (subtotal > 0 ? 15.00 : 0); // Free shipping for premium
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = () => {
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Por favor, completa todos los detalles de la tarjeta.');
      return;
    }
    if (deliveryOption === 'delivery' && (!address.department || !address.province || !address.district || !address.street || !address.number)) {
      alert('Por favor, completa todos los detalles de la dirección de envío.');
      return;
    }
    if (deliveryOption === 'pickup' && !deliveryDate) {
      alert('Por favor, selecciona una fecha de recojo.');
      return;
    }

    alert(`Pago de S/.${total.toFixed(2)} realizado con éxito vía ${paymentMethod}!`);
    
    const orderId = Date.now();
    // Add to purchase history
    setPurchaseHistory(prevHistory => [
      ...prevHistory,
      {
        id: orderId,
        date: new Date().toLocaleDateString(),
        items: cart,
        total: total,
        method: paymentMethod,
        deliveryOption: deliveryOption,
        deliveryDate: deliveryDate,
        address: deliveryOption === 'delivery' ? address : null,
        status: 'Pendiente'
      }
    ]);

    setOrderTracking(prevTracking => [...prevTracking, { id: orderId, status: 'Pedido Recibido', date: new Date().toLocaleString() }]);

    setCart([]);
    setShowCheckout(false);
    setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
    setDeliveryDate('');
    setAddress({ department: '', province: '', district: '', street: '', number: '', apt: '' });
  };

  const getMinDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="p-4 relative">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tienda</h2>

      {!showCheckout ? (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {['all', 'ropa', 'cosmeticos', 'comida', 'farmacia', 'premium'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'Todo' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {filteredProducts.map(product => (
              (product.premium && !currentUser.isPremium) ? null : ( // Hide premium products if not premium user
                <div key={product.id} className="bg-white rounded-xl shadow-md p-3 text-center relative">
                  {product.premium && <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Premium</span>}
                  <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h4 className="font-medium text-gray-800 text-sm truncate">{product.name}</h4>
                  <p className="text-orange-600 font-bold mb-2">S/.{product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-500 text-white py-1 rounded-lg text-xs hover:bg-orange-600 transition-colors"
                  >
                    Agregar al Carro
                  </button>
                </div>
              )
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sticky bottom-0 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Tu Carrito</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">El carrito está vacío.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2 text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>S/.{(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500">X</button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2 text-right">
                  <p className="font-semibold">Subtotal: S/.{subtotal.toFixed(2)}</p>
                  <p className="font-semibold">Envío: S/.{shipping.toFixed(2)} {currentUser.isPremium && '(Gratis Premium)'}</p>
                  <p className="font-bold text-lg text-orange-600">Total: S/.{total.toFixed(2)}</p>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-500 text-white py-2 rounded-lg mt-3 hover:bg-green-600 transition-colors"
                  >
                    Ir a Pagar
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Historial de Compras</h3>
            {purchaseHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">No has realizado compras aún.</p>
            ) : (
              <div className="space-y-3">
                {purchaseHistory.map(purchase => (
                  <div key={purchase.id} className="border border-gray-200 rounded-lg p-3">
                    <p className="font-medium">Fecha: {purchase.date}</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {purchase.items.map(item => (
                        <li key={item.id}>{item.name} (x{item.quantity}) - S/.{(item.price * item.quantity).toFixed(2)}</li>
                      ))}
                    </ul>
                    <p className="font-bold text-right mt-2">Total: S/.{purchase.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 text-right">Método: {purchase.method}</p>
                    <p className="text-xs text-gray-500 text-right">Estado: {purchase.status}</p>
                    {purchase.deliveryOption === 'delivery' && purchase.address && (
                      <p className="text-xs text-gray-500 text-right">Envío a: {purchase.address.street} {purchase.address.number}, {purchase.address.district}, {purchase.address.province}, {purchase.address.department}</p>
                    )}
                    {purchase.deliveryOption === 'pickup' && (
                      <p className="text-xs text-gray-500 text-right">Recojo en tienda: {purchase.deliveryDate}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Resumen de Compra</h3>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} (x{item.quantity})</span>
                <span>S/.{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="flex justify-between font-semibold"><span>Subtotal:</span> <span>S/.{subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between font-semibold"><span>Envío:</span> <span>S/.{shipping.toFixed(2)} {currentUser.isPremium && '(Gratis Premium)'}</span></p>
              <p className="flex justify-between font-bold text-lg text-orange-600"><span>Total a Pagar:</span> <span>S/.{total.toFixed(2)}</span></p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Opciones de Entrega</h3>
          <div className="space-y-3 mb-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="deliveryOption" 
                value="delivery" 
                checked={deliveryOption === 'delivery'} 
                onChange={(e) => setDeliveryOption(e.target.value)} 
                className="mr-2"
              /> Envío a Domicilio
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="deliveryOption" 
                value="pickup" 
                checked={deliveryOption === 'pickup'} 
                onChange={(e) => setDeliveryOption(e.target.value)} 
                className="mr-2"
              /> Recojo en Tienda
            </label>
          </div>

          {deliveryOption === 'delivery' && (
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="Departamento" value={address.department} onChange={(e) => setAddress({...address, department: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Provincia" value={address.province} onChange={(e) => setAddress({...address, province: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Distrito" value={address.district} onChange={(e) => setAddress({...address, district: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Avenida/Calle/Jirón" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Número" value={address.number} onChange={(e) => setAddress({...address, number: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <input type="text" placeholder="Dpto./Interior/Piso/Lote/Bloque (Opcional)" value={address.apt} onChange={(e) => setAddress({...address, apt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          )}

          {deliveryOption === 'pickup' && (
            <div className="mb-4">
              <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Recojo (5 días después):</label>
              <input type="date" id="pickup-date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} min={getMinDeliveryDate()} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4">Método de Pago</h3>
          <div className="space-y-3 mb-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="card" 
                checked={paymentMethod === 'card'} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="mr-2"
              /> Tarjeta de Crédito/Débito
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="googlePay" 
                checked={paymentMethod === 'googlePay'} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="mr-2"
              /> Google Pay
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="cash" 
                checked={paymentMethod === 'cash'} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="mr-2"
              /> Pago en Efectivo
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3 mb-4">
              <input 
                type="text" 
                placeholder="Número de Tarjeta" 
                value={cardDetails.number} 
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input 
                type="text" 
                placeholder="Nombre en la Tarjeta" 
                value={cardDetails.name} 
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  value={cardDetails.expiry} 
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} 
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input 
                  type="text" 
                  placeholder="CVV" 
                  value={cardDetails.cvv} 
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} 
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Confirmar Pago
          </button>
          <button
            onClick={() => setShowCheckout(false)}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors mt-3"
          >
            Volver al Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopScreen;