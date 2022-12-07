function showComments(recipeId) {
  // Send an AJAX request to the server to get the comments for the given recipe
  fetch(`/recipes/${recipeId}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      // Create a string of HTML elements for the comments
      let commentsHtml = comments
        .map((comment) => {
          return `
                <blockquote>
                <p>${comment.comment}</p>
                <br />
                <p>- ${comment.author}</p>
              </blockquote>
              <br />
        `;
        })
        .join("");

      // Update the page with the comments HTML
      let commentsContainer = document.getElementById("comments-container");

      commentsHtml = `<div class="comments">` + commentsHtml;
      commentsHtml += "</div>";

      commentsContainer.innerHTML = commentsHtml;

      // Unhide the comments container and form
      commentsContainer.style.display =
        commentsContainer.style.display === "none" ? "block" : "none";

      let form = document.getElementById("form");
      form.style.display = form.style.display === "none" ? "block" : "none";
    });
}

function seeComments(recipeId) {
  // Show the comments for the given recipe

  showComments(recipeId);
}

function sendComment(recipeId) {
  recipeId = parseInt(recipeId);
  // Extract the author and comment from the form fields
  let authorInput = document.querySelector("#username");
  let commentInput = document.querySelector("#comment");
  let author = authorInput.value;
  let comment = commentInput.value;
  // Create a comment object to send to the server
  let commentObject = { author, comment };

  // Send an AJAX request to the server to add the comment
  fetch(`/recipes/${recipeId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentObject),
  })
    .then((response) => response.json())
    .then(() => {
      // Clear the form fields
      authorInput.value = "";
      commentInput.value = "";

      // Update the page with the new comments
      showComments(recipeId);
    });
}
