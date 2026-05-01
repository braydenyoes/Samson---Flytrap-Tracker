const db = firebase.firestore();

// Add part
function addPart(name, quantity, location, notes) {
  db.collection("parts").add({
    name,
    quantity,
    location,
    notes,
    created: Date.now()
  });
}

// Load parts
function loadParts() {
  db.collection("parts")
    .orderBy("created", "desc")
    .onSnapshot(snapshot => {
      const list = document.getElementById("partsList");
      list.innerHTML = "";

      snapshot.forEach(doc => {
        const p = doc.data();

        const item = document.createElement("div");
        item.innerHTML = `
          <strong>${p.name}</strong> — ${p.quantity}
          <br>${p.location || ""}
        `;

        list.appendChild(item);
      });
    });
}
