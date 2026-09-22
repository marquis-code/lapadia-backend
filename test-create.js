async function test() {
  try {
    const res = await fetch('http://localhost:5001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Sub Product',
        description: 'Test',
        price: 100,
        imageUrl: 'test.jpg',
        category: 'Test',
        productType: 'subscription'
      })
    });
    console.log(await res.json());
  } catch(e) {
    console.error(e);
  }
}
test();
