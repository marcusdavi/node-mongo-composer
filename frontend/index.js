const API = "http://localhost:3000";

function createButton(label, type) {
  return $("<button>").addClass(`btn btn-${type}`).html(label);
}

function renderRows(clients) {
  const rows = clients.map((client) => {
    const updateButton = createButton("Atualizar", "warning");
    updateButton.click(() => loadClient(client));

    const removeButton = createButton("Excluir", "danger");
    removeButton.click(() => removeClient(client));

    return $("<tr>")
      .append($("<td>").append(client.name))
      .append($("<td>").append(updateButton).append(removeButton));
  });

  $("#clientsRows").html(rows);
};

function loadClient(client) {
  $("[name=id]").val(client._id);
  $("[name=name]").val(client.name);
};

function removeClient(client) {
  $.ajax({
    method: "DELETE",
    url: `${API}/clients/${client._id}`,
    success: getClients,
  });
};

function getClients() {
  $.ajax({
    url: `${API}/clients`,
    success: (clients) => {
      renderRows(clients);
      $("[name]").val("");
      $("[id]").val("");
    },
  });
};

function saveClient() {
  const _id = $("[name=id]").val();
  const name = $("[name=name]").val();
  $.ajax({
    method: _id ? "PUT" : "POST",
    url: `${API}/clients/${_id}`,
    data: _id ? { _id, name } : { name },
    success: getClients,
  });
};

$(() => {
  getClients();
  $("[save]").click(saveClient);
});
