

export default function ComplaintsTab() {
  const complaints = [
    {
      orderId: "ORD12345",
      from: "Abebe Bekele",
      issue: "Wrong product delivered",
      status: "open",
    },
    {
      orderId: "ORD98765",
      from: "Selamawit Kassa",
      issue: "Delivery delay",
      status: "resolved",
    },
  ];

  return (
    <div className="w-[100%] flex flex-col">
      <h2 className="text-xl font-semibold mb-4">User Complaints</h2>
    <div className="flex ">
      {complaints.map((c, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg bg-gray-50 shadow-sm mx-4"
        >
          <p>
            <strong>Order ID:</strong> {c.orderId}
          </p>
          <p>
            <strong>From:</strong> {c.from}
          </p>
          <p>
            <strong>Issue:</strong> {c.issue}
          </p>

          <span
            className={`px-3 py-1 mt-2 inline-block rounded-full text-white ${
              c.status === "open" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
    </div>
  );
}
