'use client';

import { type AnalysisResult } from '@/lib/api';

interface ResultDisplayProps {
    result: AnalysisResult;
    onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
    if (result.status === 'error') {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                    <div className="text-red-600 dark:text-red-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                        Analysis Failed
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mb-6">
                        {result.error || 'An error occurred during analysis'}
                    </p>
                    <button
                        onClick={onReset}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!result.data) return null;

    const { summary, actions, metadata } = result.data;

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300 border-red-200 dark:border-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300 border-green-200 dark:border-green-800';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '⚪';
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn">
            {/* Header with Reset Button */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Analysis Results
                </h2>
                <button
                    onClick={onReset}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    ← Upload New Document
                </button>
            </div>

            {/* Metadata Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    Document Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">File Name</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{metadata.fileName}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">File Size</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{(metadata.fileSize / 1024).toFixed(2)} KB</p>
                    </div>
                    {metadata.wordCount && (
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Word Count</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{metadata.wordCount.toLocaleString()}</p>
                        </div>
                    )}
                    {metadata.pageCount && (
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Pages</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{metadata.pageCount}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Summary
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {summary}
                    </p>
                </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <svg className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Action Items
                    <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                        ({actions.length} {actions.length === 1 ? 'item' : 'items'})
                    </span>
                </h3>

                {actions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No action items identified in this document.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {actions.map((action, index) => (
                            <div
                                key={action.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{getPriorityIcon(action.priority)}</span>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {action.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {action.category}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(action.priority)}`}>
                                        {action.priority.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {action.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Processing Time */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                    Processed in {
                        ((new Date(metadata.processedAt).getTime() - new Date(metadata.uploadedAt).getTime()) / 1000).toFixed(2)
                    } seconds
                </p>
            </div>
        </div>
    );
}
