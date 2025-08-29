export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const inputArray = req.body.data;

      let evenNumbers = [];
      let oddNumbers = [];
      let alphabets = [];
      let specialChars = [];
      let sum = 0;

      inputArray.forEach((item) => {
        if (/^\d+$/.test(item)) {
          let num = parseInt(item);
          if (num % 2 === 0) evenNumbers.push(num);
          else oddNumbers.push(num);
          sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          specialChars.push(item);
        }
      });

      let concatAlphabets = alphabets
        .map((ch) => ch.toUpperCase())
        .join("")
        .split("")
        .reverse()
        .map((ch, idx) =>
          idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
        )
        .join("");

      res.status(200).json({
        status: "success",
        user_id: "SumitGupta_3923",
        email: "sumitgupta@example.com",
        roll_number: "22BCE3923",
        even_numbers: evenNumbers,
        odd_numbers: oddNumbers,
        alphabets: alphabets,
        special_characters: specialChars,
        sum_of_numbers: sum,
        reversed_alphabets: concatAlphabets,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid input format" });
    }
  } else {
    res.status(200).json({ status: "GET request success, API is live!" });
  }
}
