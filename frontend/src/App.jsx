// import { useEffect, useState } from "react";
// import PocketBase from "pocketbase";

// const pb = new PocketBase("http://127.0.0.1:8090");

// export default function App() {
//   const [orders, setOrders] = useState([]);

//   // 🔄 Load + Realtime subscription
//   useEffect(() => {
//     // initial fetch
//     pb.collection("orders").getFullList().then(setOrders);

//     // realtime listener
//     pb.collection("orders").subscribe("*", (e) => {
//       console.log("Realtime event:", e);

//       setOrders((prev) => {
//         if (e.action === "create") {
//           return [...prev, e.record];
//         }

//         if (e.action === "update") {
//           return prev.map((o) =>
//             o.id === e.record.id ? e.record : o
//           );
//         }

//         if (e.action === "delete") {
//           return prev.filter((o) => o.id !== e.record.id);
//         }

//         return prev;
//       });
//     });

//     return () => {
//       pb.collection("orders").unsubscribe("*");
//     };
//   }, []);

//   // ➕ Create order
//   const createOrder = async () => {
//     await fetch("http://localhost:3001/orders", {
//       method: "POST",
//     });
//   };

//   // 🔁 Update status
//   const updateStatus = async (id, status) => {
//     await fetch(`http://localhost:3001/orders/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });
//   };

//   // ❌ Delete order
//   const deleteOrder = async (id) => {
//     await fetch(`http://localhost:3001/orders/${id}`, {
//       method: "DELETE",
//     });
//   };

//   // 🧩 Filter by status
//   const pending = orders.filter((o) => o.status === "pending");
//   const started = orders.filter((o) => o.status === "started");
//   const issued = orders.filter((o) => o.status === "issued");

//   // 🎨 Render helper
//   const renderColumn = (title, list, nextStatus) => (
//     <div style={{ flex: 1 }}>
//       <h2>{title}</h2>

//       {list.length === 0 && <p>No orders</p>}

//       {list.map((order) => (
//         <div
//           key={order.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "10px",
//             borderRadius: "8px",
//           }}
//         >
//           <div><strong>ID:</strong> {order.id}</div>
//           <div><strong>Status:</strong> {order.status}</div>

//           {/* Move button */}
//           {nextStatus && (
//             <button
//               onClick={() => updateStatus(order.id, nextStatus)}
//               style={{ marginRight: "10px" }}
//             >
//               Move to {nextStatus}
//             </button>
//           )}

//           {/* Delete */}
//           <button
//             onClick={() => deleteOrder(order.id)}
//             style={{ color: "red" }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Kitchen Orders</h1>

//       {/* Create */}
//       <button onClick={createOrder} style={{ marginBottom: "20px" }}>
//         ➕ New Order
//       </button>

//       {/* Columns */}
//       <div style={{ display: "flex", gap: "20px" }}>
//         {renderColumn("Pending", pending, "started")}
//         {renderColumn("Started", started, "issued")}
//         {renderColumn("Issued", issued, null)}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

const pbUrl = import.meta.env.VITE_PB_URL || "http://pocketbase:8080";
const pb = new PocketBase(pbUrl);

export default function App() {
  const [orders, setOrders] = useState([]);

  // Load + Realtime subscription
  useEffect(() => {
    pb.collection("orders").getFullList().then(setOrders);

    pb.collection("orders").subscribe("*", (e) => {
      console.log("Realtime event:", e);

      setOrders((prev) => {
        if (e.action === "create") {
          return [...prev, e.record];
        }

        if (e.action === "update") {
          return prev.map((o) =>
            o.id === e.record.id ? e.record : o
          );
        }

        if (e.action === "delete") {
          return prev.filter((o) => o.id !== e.record.id);
        }

        return prev;
      });
    });

    return () => {
      pb.collection("orders").unsubscribe("*");
    };
  }, []);

  // Create order (SDK)
  const createOrder = async () => {
    await pb.collection("orders").create({
      status: "pending",
    });
  };

  // Update status (SDK)
  const updateStatus = async (id, status) => {
    await pb.collection("orders").update(id, {
      status,
    });
  };

  // Delete order (SDK)
  const deleteOrder = async (id) => {
    await pb.collection("orders").delete(id);
  };

  // Filter by status
  const pending = orders.filter((o) => o.status === "pending");
  const started = orders.filter((o) => o.status === "started");
  const issued = orders.filter((o) => o.status === "issued");

  const renderColumn = (title, list, nextStatus) => (
    <div style={{ flex: 1 }}>
      <h2>{title}</h2>

      {list.length === 0 && <p>No orders</p>}

      {list.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <div><strong>ID:</strong> {order.id}</div>
          <div><strong>Status:</strong> {order.status}</div>

          {nextStatus && (
            <button
              onClick={() => updateStatus(order.id, nextStatus)}
              style={{ marginRight: "10px" }}
            >
              Move to {nextStatus}
            </button>
          )}

          <button
            onClick={() => deleteOrder(order.id)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kitchen Orders</h1>

      <button onClick={createOrder} style={{ marginBottom: "20px" }}>
        ➕ New Order
      </button>

      <div style={{ display: "flex", gap: "20px" }}>
        {renderColumn("Pending", pending, "started")}
        {renderColumn("Started", started, "issued")}
        {renderColumn("Issued", issued, null)}
      </div>
    </div>
  );
}