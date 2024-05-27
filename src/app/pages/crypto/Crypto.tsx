"use client";
import { useState } from 'react';
import colorCode from '../../../resources/colors/colorCode';
import ColorUtils from '../../../resources/colors/ColorUtils';
import normDimens from '../../../resources/dimen/normDimens';
import normFonts from '../../../resources/dimen/normFonts';
import { Line } from 'react-chartjs-2';
import useInterval from '../../hooks/useInterval';


interface Props {
    style?: React.CSSProperties;
}

const generateInitialData = (numPoints: number) => {
    const data = [];
    const endTime = Date.now();
    const startTime = endTime - (numPoints * 1000); 
    const interval = 1000;

    let lastValue = 150; 

    for (let i = 0; i < numPoints; i++) {
        const time = startTime + (i * interval);
        const change = (Math.random() * 40 - 20); 
        lastValue = Math.max(80, Math.min(150, lastValue + change)); 

        data.push({
            x: time,
            y: lastValue,
        });
    }
    return data;
};

const updateData = (prevData: { x: number; y: number }[]) => {
    const newData = prevData.slice(1);
    const lastDataPoint = prevData[prevData.length - 1];
    const newTime = Date.now();
    const change = (Math.random() * 40 - 20); 
    const newYValue = Math.max(80, Math.min(200, lastDataPoint.y + change)); 

    const newDataPoint = {
        x: newTime,
        y: newYValue,
    };
    newData.push(newDataPoint);
    return newData;
};

const Crypto = (props: Props) => {
    const {  style } = props;

    const [data, setData] = useState(generateInitialData(200));

    useInterval(() => {
        setData((prevData) => {
            if (prevData.length === 0) return prevData;
            return updateData(prevData);
        });
    }, 1000);
   
    const customPlugin: any = {
        id: 'customLinePlugin',
    
        afterDraw(chart: any): void {
            if (chart.tooltip?._active?.length) {
                const y = chart.tooltip._active[0].element.y;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                const ctx = chart.ctx;
                
                
                const yValue = yAxis.getValueForPixel(y);
                const yValueLabel = `Price: ${yValue.toFixed(2)}`;
    
               
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xAxis.left, y);
                ctx.lineTo(xAxis.right, y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(20, 156, 117, 1)';
                ctx.stroke();
                ctx.restore();
    
                
                const fontSize = 10; 
                const padding = 5; 
                const textMetrics = ctx.measureText(yValueLabel);
                const textWidth = textMetrics.width;
                const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
                const bubbleWidth = textWidth + 2 * padding + 10; 
                const bubbleHeight = textHeight + 2 * padding + 10; 
                const bubbleX = xAxis.right - 100; 
                const bubbleY = y - 50
    
               
                ctx.fillStyle = 'rgba(255,210,85,1)'; 
                ctx.beginPath();
                ctx.moveTo(bubbleX, bubbleY);
                ctx.lineTo(bubbleX + bubbleWidth - 10, bubbleY);
                ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight / 2);
                ctx.lineTo(bubbleX + bubbleWidth - 10, bubbleY + bubbleHeight);
                ctx.lineTo(bubbleX, bubbleY + bubbleHeight);
                ctx.closePath();
                ctx.fill();
    
                
                ctx.fillStyle = 'black'; 
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle'; 
                ctx.fillText(yValueLabel, bubbleX + padding, bubbleY + bubbleHeight / 2);

                
            const activePoint = chart.tooltip._active[0].element;
            ctx.fillStyle = 'orange'; 
            ctx.beginPath();
            ctx.arc(activePoint.x, activePoint.y, 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#0f0f0f'; 
            ctx.beginPath();
            ctx.arc(activePoint.x, activePoint.y, 4, 0, 2 * Math.PI);
            ctx.fill();
    
            }
        },
    };
    
    
    const colorPlugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart:any, args:any, options:any) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#ffffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
      

      const innerChartAreaColorPlugin = {
        id: 'innerChartAreaColorPlugin',
        beforeDraw: function(chart:any, easing:any) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const backgroundColor = chart.config.options.chartArea.backgroundColor;
    
            if (backgroundColor) {
                
                ctx.save();
    
                
                ctx.beginPath();
                ctx.rect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                ctx.clip();
    
               
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    
                
                ctx.restore();
            }
        }
    };

      const chartData = {
        datasets: [
          {
            label: 'Asset Price',
            data,
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 1.5,
            fill: true,
            backgroundColor: (context:any) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return null;
                }
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(255, 165, 0, 0)');
                gradient.addColorStop(1, 'rgba(255, 165, 0, 0.2)');
                return gradient;
              },
            tension: 0.4,
          },
        ],
      };
    
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: 'time' as const, 
            offset:true,
            max: (new Date().getTime()),
            grid: {
                display: false, 
                color: 'rgba(255,0,0,0.1)',
                borderColor: 'red'
            },
            ticks:{
                display: true,
                stepSize: 20,
            },
            time: {
                
             unit: 'second' as const,
          
              displayFormats: {
                second: 'hh:mm:ss',
               
              },
            },
          
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            position: 'right' as const,
            title: {
              display: true,
              text: 'Price',
            },
            grid: {
                display: false, 
                color: 'rgba(255,0,0,0.1)',
                borderColor: 'red'
            },
            max: 250,
                min: 50,
                ticks: {
                    stepSize: 5,
                   
                    display: true,
                },
          },
        },
        plugins: {
            tooltip: {
              enabled: false,
            },
            customLinePlugin: {
                active: true,
                
              },
              customCanvasBackgroundColor: {
                color: '#141419',
              },
              
          },
          interaction: {
            intersect: false,
           
            mode: 'nearest' as const,
           axis: 'x' as const,
          },
       
        elements:{
            point:{
                radius: 0,
                backgroundColor:'black'
            }
        },
        chartArea: {
            backgroundColor: '#0F0F0F'
        }
        
      };




    return (
        <div style={{ ...styles.container1, ...style }}>
            <div style={styles.container2}>
                <div style={styles.container4}>
                <Line data={chartData} options={options} plugins={[customPlugin, colorPlugin, innerChartAreaColorPlugin]} />
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container1: {
        flexDirection: 'column',
        display: 'flex',
        backgroundColor:'black',
        height: normDimens.SCREEN_HEIGHT,
        borderRadius: normDimens.DIMEN_12
    },
    container2:{
        display: 'flex',
        flexDirection: 'column',
        height:'100%',
        backgroundColor: colorCode.black,
       
    },
    container3:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height:normDimens.DIMEN_80,
        backgroundColor: colorCode.white,
        overflow: 'hidden',
        justifyContent:'space-between',
     
        paddingTop: normDimens.DIMEN_32,
        paddingRight:normDimens.DIMEN_32,
        paddingLeft: normDimens.DIMEN_32
    },
    text1: {
        fontSize: normFonts.FONT_32,
        fontWeight: 600,
        
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.primary, opacityPercent: 100 }),
       
        alignSelf:'center'
    },
    text2: {
        fontSize: normFonts.FONT_22,
        fontWeight: 500,
        
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.text_primary, opacityPercent: 100 }),
       
        marginTop: normDimens.DIMEN_8,
        paddingRight:normDimens.DIMEN_32,
        paddingLeft: normDimens.DIMEN_32
        
    },
    container4: {
        width: '99%',
        height: normDimens.DIMEN_300*3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop: normDimens.DIMEN_80,
        marginBottom: normDimens.DIMEN_100,
        paddingRight:normDimens.DIMEN_32,
        paddingLeft: normDimens.DIMEN_32,
        position:'relative'
    },
};

export default Crypto;
