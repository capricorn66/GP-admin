// vendor: node-waves v0.7.6,
import Waves from 'node-waves';

export function wavesInit() {
    Waves.attach('.btn-primary', ['waves-button', 'waves-classic', 'waves-light']);
    Waves.attach('.btn-outline-primary', ['waves-button', 'waves-classic', 'waves-dark']);
    Waves.attach('.btn-secondary', ['waves-button', 'waves-classic', 'waves-light']);
    Waves.init();
}
