const BASE_URL = "http://localhost:3000";
const btnSend = document.querySelector("#btn-send");
btnSend.addEventListener("click", async (event) => {
  try {
    const fieldName = document.querySelector("#field-name");
    const fieldMessage = document.querySelector("#field-message");
    const resultComments = document.querySelector(".result-comment");
    await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fieldName.value,
        message: fieldMessage.value,
      }),
    }).then((response) => response.json());
    resultComments.innerHTML += `
    <div class="result-comment-chat">
      <p class="message-comment">${fieldMessage.value}</p>
      <p class="name-comment">- ${fieldName.value}</p>
    </div>
    `;
  } catch (error) {
    console.error(error);
  }
});

fetch(`${BASE_URL}/comments`)
  .then((response) => response.json())
  .then((response) => {
    if (Array.isArray(response.data)) {
      const resultComments = document.querySelector(".result-comment");
      for (let i = 0; i < response.data.length; i++) {
        const comment = response.data[i];
        resultComments.innerHTML += `
        <div class="result-comment-chat">
          <p class="message-comment">${comment.message}</p>
          <p class="name-comment">- ${comment.name}</p>
        </div>
        `;
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

const navLinks = [...document.querySelectorAll(".nav-link")];
navLinks.map((nav) => {
  nav.addEventListener("click", (event) => {
    navLinks.map((item) => item.classList.remove("active"));
    nav.classList.add("active");
  });
});
