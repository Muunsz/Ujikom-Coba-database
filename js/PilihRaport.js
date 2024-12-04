class ReportSelector {
    constructor(selectElementId) {
        this.selectElement = document.getElementById(selectElementId);
        this.reports = [
            { value: "", text: "Pilih Raport" },
            { value: "10-1", text: "Kelas 10 RPL 1 Semester 1" },
            { value: "10-2", text: "Kelas 10 RPL 1 Semester 2" },
            { value: "11-1", text: "Kelas 11 RPL 1 Semester 1" },
            { value: "11-2", text: "Kelas 11 RPL 1 Semester 2" },
            { value: "12-1", text: "Kelas 12 RPL 1 Semester 1" },
            { value: "12-2", text: "Kelas 12 RPL 1 Semester 2" }
        ];
        this.init();
    }

    init() {
        this.populateOptions();
        this.addEventListeners();
    }

    populateOptions() {
        this.reports.forEach(report => {
            const option = document.createElement('option');
            option.value = report.value;
            option.textContent = report.text;
            this.selectElement.appendChild(option);
        });
    }

    addEventListeners() {
        this.selectElement.addEventListener('change', this.handleReportChange.bind(this));
    }

    handleReportChange(event) {
        const selectedReport = event.target.value;
        if (selectedReport) {
            console.log(`Selected report: ${selectedReport}`);
            // Here you can add logic to load the selected report
            this.loadReportData(selectedReport);
        }
    }

    loadReportData(reportId) {
        // This method would be implemented to load the actual report data
        console.log(`Loading report data for ${reportId}`);
        // For now, we'll just log a message. In a real application, this would fetch and display the report data.
    }
}

