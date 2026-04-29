// 1. මෙනුවේ බොත්තම් (Tabs) වැඩ කිරීමට අවශ්‍ය කේතය
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // අනෙක් පිටු වසා දැමීම
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    // ඔබන ලද පිටුව පමණක් විවෘත කිරීම
    tab.classList.add('active');
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// 2. ගොවියන්ගේ දත්ත Database එකට යැවීමේ කේතය
const farmerForm = document.getElementById('farmer-form');
if (farmerForm) {
  farmerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ෆෝම් එකේ දත්ත එකතු කරගැනීම
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // වැදගත්: පහත ලින්ක් එක වෙනුවට Render එකෙන් ලැබුණු ඔබේ ලින්ක් එක අනිවාර්යයෙන්ම දමන්න!
      const response = await fetch('https://postgresql://rukmal_db_user:1zPrDS1lbIImZUwceR0Yekx46CCmtQdu@dpg-d7p3ovhkh4rs73bsac60-a/rukmal_dbapi/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("ගොවියාගේ දත්ත සාර්ථකව Database එකේ සුරැකුවා!");
        e.target.reset(); // ෆෝම් එක හිස් කිරීම
      } else {
        alert("දත්ත සුරැකීමේදී දෝෂයක් ඇතිවිය.");
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
      alert("සර්වර් එකට සම්බන්ධ වීමට නොහැක!");
    }
  });
}
