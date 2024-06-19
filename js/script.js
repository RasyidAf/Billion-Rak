document
  .getElementById("reviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Mendapatkan nilai dari form
    var name = document.getElementById("name").value;
    var review = document.getElementById("review").value;

    // Membuat objek ulasan baru
    var newReview = {
      id: Date.now(), // Menggunakan timestamp sebagai ID unik
      name: name,
      review: review,
    };

    // Menyimpan ulasan ke local storage
    var reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Menambahkan ulasan baru ke halaman
    addReviewToPage(newReview);

    // Mengosongkan form
    document.getElementById("reviewForm").reset();
  });

// Fungsi untuk menambahkan ulasan ke halaman
function addReviewToPage(review) {
  var reviewItem = document.createElement("div");
  reviewItem.className = "review-item";
  reviewItem.dataset.id = review.id; // Menyimpan ID ulasan di dataset

  var reviewName = document.createElement("h3");
  reviewName.innerText = review.name;
  reviewItem.appendChild(reviewName);

  var reviewText = document.createElement("p");
  reviewText.innerText = review.review;
  reviewItem.appendChild(reviewText);

  // Menambahkan tombol hapus
  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "Hapus";
  deleteButton.addEventListener("click", function () {
    deleteReview(review.id);
  });
  reviewItem.appendChild(deleteButton);

  document.getElementById("reviewsContainer").appendChild(reviewItem);
}

// Fungsi untuk menghapus ulasan
function deleteReview(id) {
  // Menghapus ulasan dari local storage
  var reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews = reviews.filter(function (review) {
    return review.id !== id;
  });
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // Menghapus ulasan dari halaman
  var reviewItem = document.querySelector(`.review-item[data-id='${id}']`);
  if (reviewItem) {
    reviewItem.remove();
  }
}

// Memuat ulasan dari local storage saat halaman dimuat
window.addEventListener("load", function () {
  var reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(function (review) {
    addReviewToPage(review);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});