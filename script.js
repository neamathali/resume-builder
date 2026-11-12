
const resumeForm = document.getElementById("resumeForm");
const resumeOutput = document.getElementById("resumeOutput");
const downloadBtn = document.getElementById("downloadBtn");

// Safely display user-entered text
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

// Generate resume when the form is submitted
resumeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = escapeHTML(document.getElementById("fullName").value.trim());
    const email = escapeHTML(document.getElementById("email").value.trim());
    const phone = escapeHTML(document.getElementById("phone").value.trim());
    const address = escapeHTML(document.getElementById("address").value.trim());
    const objective = escapeHTML(document.getElementById("objective").value.trim());
    const education = escapeHTML(document.getElementById("education").value.trim());
    const experience = escapeHTML(document.getElementById("experience").value.trim());
    const skills = escapeHTML(document.getElementById("skills").value.trim());
    const projects = escapeHTML(document.getElementById("projects").value.trim());
    const languages = escapeHTML(document.getElementById("languages").value.trim());

    // Get design choices
    const colorTheme = document.getElementById("colorTheme").value;
    const fontStyle = document.getElementById("fontStyle").value;

    // Check the optional GitHub URL
    const githubInput = document.getElementById("github").value.trim();
    let githubHTML = "";

    if (githubInput !== "") {
        try {
            const githubURL = new URL(githubInput);

            if (
                githubURL.protocol !== "https:" ||
                !["github.com", "www.github.com"].includes(githubURL.hostname)
            ) {
                alert("Please enter a valid GitHub repository link beginning with https://github.com/");
                return;
            }

            const safeURL = escapeHTML(githubURL.href);

            githubHTML = `
                <div class="resume-github">
                    <strong>GitHub Repository:</strong>
                    <a href="${safeURL}" target="_blank" rel="noopener noreferrer">
                        ${safeURL}
                    </a>
                </div>
            `;
        } catch (error) {
            alert("Please enter a valid GitHub URL.");
            return;
        }
    }

    // Apply selected color and font to the resume
    resumeOutput.className = `resume-paper theme-${colorTheme} font-${fontStyle}`;

    // Create the resume
    resumeOutput.innerHTML = `
        <h1 class="resume-name">${fullName}</h1>

        <div class="resume-contact">
            ${email}
            ${phone ? " | " + phone : ""}
            ${address ? "<br>" + address : ""}
            ${githubHTML}
        </div>

        ${objective ? `
            <h3 class="resume-heading">CAREER OBJECTIVE</h3>
            <div class="resume-content">${objective}</div>
        ` : ""}

        ${education ? `
            <h3 class="resume-heading">EDUCATION</h3>
            <div class="resume-content">${education}</div>
        ` : ""}

        ${experience ? `
            <h3 class="resume-heading">WORK EXPERIENCE</h3>
            <div class="resume-content">${experience}</div>
        ` : ""}

        ${skills ? `
            <h3 class="resume-heading">SKILLS</h3>
            <div class="resume-content">${skills}</div>
        ` : ""}

        ${projects ? `
            <h3 class="resume-heading">PROJECTS</h3>
            <div class="resume-content">${projects}</div>
        ` : ""}

        ${languages ? `
            <h3 class="resume-heading">LANGUAGES</h3>
            <div class="resume-content">${languages}</div>
        ` : ""}
    `;

    // Enable the download/print button
    downloadBtn.disabled = false;

    // Scroll to the generated resume
    document.getElementById("previewSection").scrollIntoView({
        behavior: "smooth"
    });
});

// Print or save resume as PDF
downloadBtn.addEventListener("click", function() {
    window.print();
});
