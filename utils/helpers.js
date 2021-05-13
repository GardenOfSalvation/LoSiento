module.exports = {
    formatDate: (timestamp) => {
        let formatTime = new Date(timestamp);

        return formatTime.toLocaleString();
    }
};