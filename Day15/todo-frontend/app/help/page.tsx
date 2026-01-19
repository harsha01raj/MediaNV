"use client";

import ProtectedRoute from "../component/protected_routes";

export default function HelpPage() {
    const faqs = [
        {
            question: "How do I add a new task?",
            answer:
                "Click the 'Add Task' button at the top of your Todo list, type the task name, and hit Enter or the Add button.",
        },
        {
            question: "How do I mark a task as completed?",
            answer:
                "Click the checkbox next to the task. Completed tasks will appear in the Completed Tasks page.",
        },
        {
            question: "Can I delete a task?",
            answer:
                "Yes! Click the trash icon next to any task to remove it permanently.",
        },
        {
            question: "How can I reset all tasks?",
            answer:
                "Currently, you can delete tasks individually. Bulk delete is coming soon!",
        },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 animate-fade-in">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Help & Support
                    </h1>

                    {/* Tips Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">
                            Quick Tips
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Use the keyboard (Tab + Enter) for faster task management.</li>
                            <li>Completed tasks appear on a separate page for better tracking.</li>
                            <li>Hover over tasks for quick edit/delete options.</li>
                            <li>Stay consistent by adding deadlines in the task name.</li>
                        </ul>
                    </div>


                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <details
                                    key={idx}
                                    className="border rounded-lg p-4 transition-all duration-300 hover:shadow-sm"
                                >
                                    <summary className="cursor-pointer font-medium text-gray-800">
                                        {faq.question}
                                    </summary>
                                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>


                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Need more help? Contact us at{" "}
                        <a
                            href="mailto:support@todoapp.com"
                            className="text-indigo-600 hover:underline"
                        >
                            support@todoapp.com
                        </a>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}