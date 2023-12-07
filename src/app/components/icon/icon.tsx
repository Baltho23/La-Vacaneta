import './icon.css';

export default function Icon({name, size = "md"}: {name: string, size?: string}) {
    
    return (
        <i className={`icon-${size} uil uil-${name}`}></i>
    );
}