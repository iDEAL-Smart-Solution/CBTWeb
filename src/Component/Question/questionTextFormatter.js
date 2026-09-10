export const formatQuestionText = (value) => {
    if (!value) return "";

    const decodedValue = (() => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = String(value);
        return textarea.value;
    })();

    const formattedValue = decodedValue.replace(
        /([A-Za-z0-9)\]])\^([A-Za-z0-9+-]+)/g,
        "$1<sup>$2</sup>"
    );

    const escaped = formattedValue
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    return escaped
        .replace(/&lt;(\/)?(sup|sub|strong|em|u)&gt;/gi, "<$1$2>")
        .replace(/&lt;br\s*\/?&gt;/gi, "<br/>");
};

export const renderQuestionText = (value) => ({
    __html: formatQuestionText(value),
});