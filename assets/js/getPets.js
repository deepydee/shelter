export async function getPets(filePath) {
  try {
    const res = await fetch(filePath);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
}
