const { assert } = require('chai');

describe('Game5', function () {
  it('should be a winner', async function () {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    let wallet;

    while (
      !wallet ||
      wallet.address >= 0x00ffffffffffffffffffffffffffffffffffffff
    ) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    }

    const [signer] = await ethers.getSigners();
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther('1'),
    });

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
