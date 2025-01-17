import React from "react";

const Header = ({ account, connectWallet }) => {
  return (
    <header className="header">
      <h1>Liquidity Pool DApp</h1>
      {account ? (
        <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
      ) : (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Header;
