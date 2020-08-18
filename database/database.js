const fs = require('fs');

const readOrders = () => {
    try {
        const content = fs.readFileSync('burger.json');
        return JSON.parse(content.toString());
    } catch (e) {
        return [];
    }
}

const saveorders = orders => {
    fs.writeFileSync('burger.json', JSON.stringify(orders));
}

const addOrder = order => {
    order.id = Math.floor((Math.random() * 10000) + 1);
    const orders = readOrders();
    orders.push(order);
    saveorders(orders);
    return order;
}

module.exports = ({
    readOrders,
    addOrder
})