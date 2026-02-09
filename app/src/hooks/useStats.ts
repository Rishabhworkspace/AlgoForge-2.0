import { useState, useEffect } from 'react';
import { problems, roadmapCategories } from '@/data/roadmaps';

export function useStats() {
    const [userCount, setUserCount] = useState<string>('10K+');
    const [problemCount, setProblemCount] = useState<string>('500+');
    const [videoCount, setVideoCount] = useState<string>('300+');
    const [roadmapCount, setRoadmapCount] = useState<string>('12');

    useEffect(() => {
        // 1. Calculate static data from roadmaps.ts
        // Problems
        if (problems && problems.length > 0) {
            setProblemCount(`${problems.length}+`);

            // Video Solutions
            const videos = problems.filter((p: any) => p.video_link || p.videoUrl || p.video_url || p.youtubeUrl);
            if (videos.length > 0) {
                setVideoCount(`${videos.length}+`);
            } else {
                // Fallback
                setVideoCount(`${Math.floor(problems.length * 0.8)}+`);
            }
        }

        // Roadmaps/Categories
        if (roadmapCategories) {
            setRoadmapCount(`${roadmapCategories.length}`);
        }

        // 2. Fetch User Count from Backend
        const fetchStats = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/info/stats`);
                if (res.ok) {
                    const data = await res.json();
                    let count = data.userCount;

                    if (count >= 1000) {
                        setUserCount(`${(count / 1000).toFixed(1)}K+`);
                    } else if (count > 0) {
                        setUserCount(`${count}`);
                    }
                    // if 0, keep default 10K+
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return {
        userCount,
        problemCount,
        videoCount,
        roadmapCount
    };
}
