const ProductCard = ({ product }) => {
  // Avoid loading local filesystem paths (file:// or C:\) directly in the browser.
  // Use remote URLs or app public paths (starting with '/') — otherwise show a placeholder.
  let imageSrc = '';
  try {
    const img = product?.image || '';
    if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/'))) {
      imageSrc = img;
    } else {
      // fallback placeholder (inline SVG data URI)
      imageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='18'>No image available</text></svg>`
      )}`;
    }
  } catch (err) {
    imageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='18'>No image available</text></svg>`
    )}`;
  }

  return (
    <div className="border rounded-lg p-3 hover:shadow-lg transition">
      <img
        src={imageSrc}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md"
        loading="lazy"
      />
      <h4 className="font-semibold mt-2 text-sm">{product.name}</h4>
      <p className="text-gray-600 text-xs">{product.seller}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="font-semibold">${product.price}</p>
        <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-md hover:bg-green-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

