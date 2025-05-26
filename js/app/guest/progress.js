export const progress = (() => {
    /**
     * @type {HTMLElement|null}
     */
    let info = null;

    /**
     * @type {HTMLElement|null}
     */
    let bar = null;

    let total = 0;
    let loaded = 0;
    let valid = true;

    /**
     * Tidak menambah jumlah resource yang dimuat.
     */
    const add = () => {
        // Kosongkan agar tidak menghitung resource
    };

    /**
     * Menampilkan progress informasi (jika dibutuhkan).
     * @returns {string}
     */
    const showInformation = () => {
        return `(${loaded}/${total}) [${parseInt((loaded / total) * 100).toFixed(0)}%]`;
    };

    /**
     * Menyelesaikan progress tanpa menampilkan bar.
     * @param {string} type
     */
    const complete = (type) => {
        if (!valid) return;

        loaded += 1;

        // Jangan tampilkan informasi atau bar
        if (loaded === total) {
            document.dispatchEvent(new Event('progress.done'));
        }
    };

    /**
     * Menandai jika ada error pada loading.
     * @param {string} type
     */
    const invalid = (type) => {
        valid = false;
        // Tidak perlu tampilkan error visual
    };

    /**
     * Inisialisasi tanpa menampilkan apapun.
     */
    const init = () => {
        info = document.getElementById('progress-info');
        bar = document.getElementById('progress-bar');

        // Sembunyikan elemen jika ada
        if (info) info.style.display = 'none';
        if (bar) bar.style.display = 'none';

        // Langsung trigger event selesai
        document.dispatchEvent(new Event('progress.done'));
    };

    return {
        init,
        add,
        invalid,
        complete,
    };
})();
