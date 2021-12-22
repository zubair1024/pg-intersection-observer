window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  const cardContainer = document.querySelector(".cards");
  const cards = document.querySelectorAll(".card");

  /**
   * Implement the animation of the cards
   */
  const observer = new IntersectionObserver(
    (entires) => {
      console.log(entires);
      entires.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        //stop observing when the card goes from visible to not visible
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      threshold: 1,
      rootMargin: "10px",
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  /**
   * Implementing infinite scroll
   */
  const lastCardObserver = new IntersectionObserver((entires) => {
    const lastCard = entires[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
  }, {});

  const loadNewCards = () => {
    // alert("last card reached");
    for (let i = 0; i < 10; i++) {
      const card = document.createElement("div");
      card.textContent = "new card";
      card.classList.add("card");
      observer.observe(card);
      cardContainer.append(card);
    }
    lastCardObserver.observe(cardContainer.lastElementChild);
  };
  const lastCard = document.querySelector(".card:last-child");
  lastCardObserver.observe(lastCard);
});
