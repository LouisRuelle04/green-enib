import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
    {
        id: 1,
        ipcapteur: 1,
        temperature: 20,
        humidity: 72,
        soilHumidity: 50,
        lumens: 0,
        dateMesure: '2024-10-12T17:10:25.000Z'
    },
    {
        id: 2,
        ipcapteur: 1,
        temperature: 20,
        humidity: 72,
        soilHumidity: 50,
        lumens: 0,
        dateMesure: '2024-10-12T17:10:30.000Z'
    },
];

export default function PlantGraph({ data }) {



    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="dateMesure"
                    label={{ value: "Heures", position: "insideBottomRight", offset: -10 }}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:00`;
                    }}
                />
                <YAxis />
                <Tooltip labelFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                }} />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#82ca9d" dot={false} strokeWidth={2}/>
                <Line type="monotone" dataKey="humidity" stroke="#8884d8" dot={false} strokeWidth={2}/>
            </LineChart>
        </ResponsiveContainer>

    );
};
