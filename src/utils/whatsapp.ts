import { CartItem, CustomerInfo } from '../types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const generateWhatsAppLink = (
  cart: CartItem[],
  total: number,
  customer: CustomerInfo,
  phone: string = '5511999999999' // Mock phone number
) => {
  const orderList = cart.map(item => {
    const sizeStr = item.category.includes('Pizzas') ? ` (${item.size})` : '';
    const extrasStr = item.extras.length > 0 ? `\n    └ Extras: ${item.extras.join(', ')}` : '';
    const obsStr = item.observations ? `\n    └ Obs: ${item.observations}` : '';
    return `- ${item.quantity}x ${item.name}${sizeStr}${extrasStr}${obsStr}`;
  }).join('\n');

  const message = `*Novo Pedido 🍕*
*Nome:* ${customer.name}
*Telefone:* ${customer.phone}
*Endereço:* ${customer.address}

*Pedido:*
${orderList}

*Total: ${formatCurrency(total)}*

*Forma de pagamento:* ${customer.paymentMethod}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
