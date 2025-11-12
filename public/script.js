 function learn () {

        const fruits = [
            { name: "Apple", icon: "🍎" },
            { name: "Orange", icon: "🍊" },
            { name: "Plum", icon: "🍑" }
    ];

        const list = document.getElementById("fruit-list")

        for (let i = 0; i < fruits.length; i++) {
        const li = document.createElement("li");
        li.textContent = fruits[i].name;

        li.addEventListener("click", async () => {
            li.style.color = "gold";

            // send email via backend 
            await fetch("/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: "flame@example.com",
                    subject: `You clicked ${fruits[i].name}`,
                    text: `User clicked ${fruits[i].name} ${fruits[i].icon}`
                }),
            });


            alert(`Email sent for ${fruits[i].name} ${fruits[i].icon}`);
        }); 

        list.appendChild(li);
    }
}
    learn ();