$(document).ready(function() {
  const addTarefasInput = $("#addTarefas");
  const addTarefaButton = $("#addTarefaButton");
  const tarefasList = $("#tarefasList");

  // Função para adicionar uma tarefa
  function addTarefa() {
    const tarefaText = addTarefasInput.val().trim();
    if (tarefaText !== "") {
      const tarefaItem = $("<li>");
      tarefaItem.addClass("tarefa-item");

      const tarefaTextElement = $("<div>");
      tarefaTextElement.addClass("tarefa-text");
      tarefaTextElement.text(tarefaText);

      const tarefaEditElement = $("<div>");
      tarefaEditElement.addClass("tarefa-edit");
      tarefaEditElement.text("Editar");
      tarefaEditElement.click(function() {
        const editedText = prompt("Editar tarefa:", tarefaText);
        if (editedText !== null) {
          tarefaTextElement.text(editedText);
          salvarTarefas();
        }
      });

      const tarefaDeleteElement = $("<div>");
      tarefaDeleteElement.addClass("tarefa-delete");
      tarefaDeleteElement.text("Excluir");
      tarefaDeleteElement.click(function() {
        $(this).parent().remove();
        salvarTarefas();
      });

      tarefaTextElement.click(function() {
        tarefaTextElement.toggleClass("concluida");
        salvarTarefas();
      });

      tarefaItem.append(tarefaTextElement);
      tarefaItem.append(tarefaEditElement);
      tarefaItem.append(tarefaDeleteElement);
      tarefasList.append(tarefaItem);

      addTarefasInput.val("");
      addTarefasInput.focus();

      salvarTarefas();
    }
  }

  // Aciona a função ao clicar no botão Adicionar
  addTarefaButton.click(addTarefa);

  // Aciona a função quando a tecla Enter é pressionada no campo de input
  addTarefasInput.keypress(function(event) {
    if (event.key === "Enter") {
      addTarefa();
      event.preventDefault();
    }
  });

  // Função para salvar as tarefas no localStorage
  function salvarTarefas() {
    const tarefas = tarefasList.children(".tarefa-item").map(function() {
      return $(this).find(".tarefa-text").text();
    }).get();

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  // Função para carregar as tarefas do localStorage ao carregar a página
  function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");

    tarefas.forEach(function(tarefaText) {
      const tarefaItem = $("<li>");
      tarefaItem.addClass("tarefa-item");

      const tarefaTextElement = $("<div>");
      tarefaTextElement.addClass("tarefa-text");
      tarefaTextElement.text(tarefaText);

      const tarefaEditElement = $("<div>");
      tarefaEditElement.addClass("tarefa-edit");
      tarefaEditElement.text("Editar");
      tarefaEditElement.click(function() {
        const editedText = prompt("Editar tarefa:", tarefaText);
        if (editedText !== null) {
          tarefaTextElement.text(editedText);
          salvarTarefas();
        }
      });

      const tarefaDeleteElement = $("<div>");
      tarefaDeleteElement.addClass("tarefa-delete");
      tarefaDeleteElement.text("Excluir");
      tarefaDeleteElement.click(function() {
        $(this).parent().remove();
        salvarTarefas();
      });

      tarefaTextElement.click(function() {
        tarefaTextElement.toggleClass("concluida");
        salvarTarefas();
      });

      tarefaItem.append(tarefaTextElement);
      tarefaItem.append(tarefaEditElement);
      tarefaItem.append(tarefaDeleteElement);
      tarefasList.append(tarefaItem);
    });
  }

  // Carregar as tarefas ao carregar a página
  carregarTarefas();
});
