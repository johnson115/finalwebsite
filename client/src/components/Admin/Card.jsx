import React from "react";

const Card = () => {
  return (
    <div>
      <div class="card">
        <div class="card__side card__side_front">
          <div class="flex__1">
            <p class="card__side__name-bank"></p>
            <div class="card__side__chip"></div>
            <p class="card__side__name-person">Digital Move Up</p>
          </div>
        </div>
        <div class="card__side card__side_back">
          <div class="card__side__black"></div>
          <p class="card__side__number">XXXX XXXX XXXX XXXX</p>
          <div class="flex__2">
            <p class="card__side__other-numbers card__side__other-numbers_1">
              XX/XX
            </p>
            <p class="card__side__other-numbers card__side__other-numbers_2">
              XXX
            </p>
            <div class="card__side__photo">your-photo</div>
            <div class="card__side__debit">debit</div>
          </div>
          <p class="card__side__other-info">
            MONOBANK.UA | 0 800 205 205 | АТ "УНІВЕРСАЛ БАНК". ЛІЦЕНЗІЯ НБУ №92
            ВІД 20.01.1994 | PCE PC100650 WORLD DEBIT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
