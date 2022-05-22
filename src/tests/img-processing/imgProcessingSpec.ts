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

  it('request non-existing image', async () => {
    let filename = 'NotimageName',
      width = '200',
      height = '200';

    await imgProcessing.imgProcess(filename, width, height);

    expect(filename).not.toBe('imageName');
  });

  it('invalid width', async () => {
    let filename = 'NotimageName',
      width = 'asd',
      height = '200';

    await imgProcessing.imgProcess(filename, width, height);

    expect(width).not.toBe('200');
  });

  it('invalid height', async () => {
    let filename = 'NotimageName',
      width = '200',
      height = 'asd';

    await imgProcessing.imgProcess(filename, width, height);

    expect(height).not.toBe('200');
  });
});
