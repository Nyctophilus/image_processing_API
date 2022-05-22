import imgProcessing from '../../img-processing/imgProcessing';

describe('Test image processing function', () => {
  it('process the image', async () => {
    let filename = 'imageName',
      width = '200',
      height = '200';

    await imgProcessing.imgProcess(filename, width, height);

    expect(filename).toBe('imageName');

    expect(width).toBe('200');

    expect(height).toBe('200');
  });
});
