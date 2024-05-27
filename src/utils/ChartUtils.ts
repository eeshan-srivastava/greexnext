"use client";
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    CategoryScale,
    Filler
  } from 'chart.js';
import 'chartjs-adapter-moment';

const initCharts = () =>{
    ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, CategoryScale, Filler);
}

export default {
    initCharts
}