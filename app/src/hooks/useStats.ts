import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useStats() {
    const [userCount, setUserCount] = useState<string>('0');
    const [problemCount, setProblemCount] = useState<string>('0');
    const [videoCount, setVideoCount] = useState<string>('0');
    const [roadmapCount, setRoadmapCount] = useState<string>('0');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/info/stats`);
                const data = res.data;

                // Format numbers (e.g. 1.2k)
                const formatCount = (count: number) => {
                    if (count >= 1000) return `${(count / 1000).toFixed(1)}K+`;
                    return `${count}`;
                };

                setUserCount(formatCount(data.userCount));
                setProblemCount(formatCount(data.problemCount));
                setVideoCount(formatCount(data.videoCount));
                setRoadmapCount(`${data.roadmapCount}`);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return {
        userCount,
        problemCount,
        videoCount,
        roadmapCount,
        loading
    };
}
